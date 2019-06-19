const router = require('express').Router();
const S = require('simplebig');
const query = require('./sql/query.js');

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
 * Search people list
 * @request `nameString`
 * @response Array of {`c_personid`, `c_name`, `c_name_chn`, `event_number`}
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

    let sqlstr = query.sql_select_PeopleList;
    params.nameString = S.s2t(params.namestr);
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
 * Get person information
 * @request `c_personid`
 * @response Object
 */
router.post('/person-information', (req, res) => {
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

    let sqlstr = query.sql_select_BasicInformation;
    conn.query(sqlstr, params.c_personid, (err, results) => {
      if (err) {
        res.status(500).json({
          msg: err
        });
        throw err;
      }

      res.status(200).json({
        results: results[0]
      });
    });
    
    conn.release();
  });
});

/**
 * Get person information source
 * @request `c_personid`
 * @response Array of {`Source`, `Pages`, `Notes`}
 */
router.post('/person-information-source', (req, res) => {
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

    let sqlstr = query.sql_select_PersonSources;
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
});

/**
 * Get person alias
 * @request `c_personid`
 * @response Array
 */
router.post('/person-aliases', (req, res) => {
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

    let sqlstr = query.sql_select_PersonAliases;
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
});

/**
 * Get person addresses (Geographic information)
 * @request `c_personid`
 * @response Array
 */
router.post('/person-addresses', (req, res) => {
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

    let sqlstr = query.sql_select_PersonAddresses;
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
});

/**
 * Get person entry information
 * @request `c_personid`
 * @response Array
 */
router.post('/person-entry', (req, res) => {
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

    let sqlstr = query.sql_select_PersonEntryInfo;
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
});

/**
 * Get person posting information
 * @request `c_personid`
 * @response Array
 */
router.post('/person-postings', (req, res) => {
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

    let sqlstr = query.sql_select_PersonPostings;
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
});

/**
 * Get person social status information
 * @request `c_personid`
 * @response Array
 */
router.post('/person-social-status', (req, res) => {
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

    let sqlstr = query.sql_select_PersonSocialStatus;
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
});

/**
 * Get person kinship information
 * @request `c_personid`
 * @response Array
 */
router.post('/person-kinship', (req, res) => {
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

    let sqlstr = query.sql_select_PersonKinshipInfo;
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
});

/**
 * Get person social association information
 * @request `c_personid`
 * @response Array
 */
router.post('/person-association', (req, res) => {
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

    let sqlstr = query.sql_select_PersonSocialAssociation;
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
});

/**
 * Get person works information
 * @request `c_personid`
 * @response Array
 */
router.post('/person-works', (req, res) => {
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

    let sqlstr = query.sql_select_PersonWorks;
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
});


module.exports = router;