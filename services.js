const router = require('express').Router();

// Connect MySQL
const mysql = require('mysql');
const poolCluster = mysql.createPoolCluster();
poolCluster.add('hi_story', {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'hi_story'
});

/**
 * Search people by `nameString`
 */
router.post('/search-people', (req, res) => {
  let params = req.body;
  
  if (params.nameString === undefined) {
    let msg = 'nameString is undefined';
    res.status(500).json({
      msg: msg
    });
    throw msg;
  }

  if (params.nameString === '') {
    let msg = 'nameString is empty';
    res.status(404).json({
      msg: msg
    });
    throw msg;
  }

  poolCluster.getConnection('hi_story', (error, conn) => {
    if (error) {
      res.status(500);
      throw error;
    }

    let sqlstr = 'SELECT `c_personid`, `c_name`, `c_name_chn`, `event_number` FROM biog_main WHERE c_name_chn LIKE ? OR c_name LIKE ? ORDER BY `c_name`';
    let namestr = '%' + params.nameString.split('').join('%') + '%';
    conn.query(sqlstr, [namestr, namestr], (err, results) => {
      if (err) {
        res.status(500).json({
          msg: err
        });
        throw err;
      }

      res.status(200).json({
        results: results
      });
    });
    
    conn.release();
  });
});

/**
 * Get people information by `c_personid`
 */
router.post('/people-information', (req, res) => {
  let params = req.body;

  if (params.c_personid === undefined) {
    let msg = 'c_personid is undefined';
    res.status(500).json({
      msg: msg
    });
    throw msg;
  }

  poolCluster.getConnection('hi_story', (error, conn) => {
    if (error) {
      res.status(500);
      throw error;
    }

    let sqlstr = 'SELECT * FROM biog_main WHERE `c_personid` = ?';
    conn.query(sqlstr, params.c_personid, (err, results) => {
      if (err) {
        res.status(500).json({
          msg: err
        });
        throw err;
      }

      res.status(200).json({
        results: results
      });
    });
    
    conn.release();
  });
})

module.exports = router;