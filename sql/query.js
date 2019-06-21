const query = {
  sql_select_PeopleList: () => {
    return "SELECT " +
    "`c_personid`, `c_name`, `c_name_chn`, `event_number` " + 
    "FROM biog_main WHERE c_name_chn LIKE ? " +
    "OR c_name LIKE ? ORDER BY `c_name`";
  },
  sql_select_BasicInformation: () => {
    return "SELECT " + 
    "	biog_main.c_personid AS PersonId, " + 
    "	biog_main.c_name AS EngName, " + 
    "	biog_main.c_name_chn AS ChName, " + 
    "	biog_main.c_index_year AS IndexYear, " + 
    "	biog_main.c_female AS Gender, " + 
    "	 " + 
    "	biog_main.c_birthyear AS YearBirth, " + 
    "	n1.c_dynasty_chn AS DynastyBirth, " + 
    "	n1.c_nianhao_chn AS EraBirth, " + 
    "	biog_main.c_by_nh_year AS EraYearBirth, " + 
    "	 " + 
    "	biog_main.c_deathyear AS YearDeath, " + 
    "	n2.c_dynasty_chn AS DynastyDeath, " + 
    "	n2.c_nianhao_chn AS EraDeath, " + 
    "	biog_main.c_dy_nh_year AS EraYearDeath, " + 
    "	 " + 
    "	biog_main.c_death_age AS YearsLived, " + 
    "	dynasties.c_dynasty_chn AS Dynasty, " + 
    "	choronym_codes.c_choronym_chn AS JunWang, " + 
    "	 " + 
    "	biog_main.c_notes AS Notes " + 
    "	 " + 
    "FROM " + 
    "	biog_main " + 
    "	INNER JOIN nian_hao AS n1 " + 
    "	INNER JOIN nian_hao AS n2 " + 
    "	INNER JOIN choronym_codes " + 
    "	INNER JOIN dynasties " + 
    "WHERE " + 
    "	biog_main.c_personid = ? " + 
    "AND " + 
    "	biog_main.c_by_nh_code = n1.c_nianhao_id " + 
    "AND " + 
    "	biog_main.c_dy_nh_code = n2.c_nianhao_id " + 
    "AND " + 
    "	biog_main.c_choronym_code = choronym_codes.c_choronym_code " + 
    "AND " + 
    "	biog_main.c_dy = dynasties.c_dy"
  },
  sql_select_PersonSources: () => {
    return "SELECT " +
    "  text_codes.c_title_chn AS Source, " +
    "  biog_source_data.c_pages AS Pages, " +
    "  biog_source_data.c_notes AS Notes  " +
    "FROM " +
    "  biog_source_data " +
    "  INNER JOIN text_codes  " +
    "WHERE " +
    "  biog_source_data.c_personid = ? " +
    "AND " +
    "  biog_source_data.c_textid = text_codes.c_textid ";
  },
  sql_select_PersonAliases: () => {
    return "SELECT " +
    "	altname_codes.c_name_type_desc_chn AS AliasType, " +
    "	altname_data.c_alt_name_chn AS AliasName  " +
    "FROM " +
    "	altname_data " +
    "	INNER JOIN altname_codes  " +
    "WHERE " +
    "	altname_data.c_personid = ? " +
    "	AND altname_data.c_alt_name_type_code = altname_codes.c_name_type_code ";
  },
  sql_select_PersonAddresses: () => {
    return "SELECT " + 
    "  biog_addr_data.c_addr_id, " + 
    "  biog_addr_codes.c_addr_desc_chn AS AddrType, " + 
    "   " + 
    "  addr_codes.c_name_chn AS AddrName, " + 
    "  a2.c_name_chn AS blongs0_name, " + 
    "  addresses.belongs1_Name AS belongs1_name, " + 
    "  addresses.belongs2_Name AS belongs2_name, " + 
    "  addresses.belongs3_Name AS belongs3_name, " + 
    "  addresses.belongs4_Name AS belongs4_name, " + 
    "  addresses.belongs5_Name AS belongs5_name, " + 
    "   " + 
    "  biog_addr_data.c_sequence AS MoveCount, " + 
    "  biog_addr_data.c_firstyear AS FirstYear, " + 
    "  biog_addr_data.c_lastyear AS LastYear, " + 
    "    text_codes.c_title_chn AS Source, " + 
    "  biog_addr_data.c_pages AS Pages, " + 
    "    biog_addr_data.c_notes AS Notes  " + 
    "FROM " + 
    "  biog_addr_data " + 
    "  INNER JOIN addr_codes " + 
    "  INNER JOIN biog_addr_codes " + 
    "  INNER JOIN text_codes " + 
    "  INNER JOIN addr_belongs_data " + 
    "  INNER JOIN addresses " + 
    "  INNER JOIN addr_codes AS a2 " + 
    "WHERE " + 
    "  biog_addr_data.c_personid = ? " + 
    "AND " + 
    "  biog_addr_data.c_addr_id = addr_codes.c_addr_id " + 
    "AND " + 
    "  biog_addr_data.c_addr_type = biog_addr_codes.c_addr_type " + 
    "AND " + 
    "  biog_addr_data.c_source = text_codes.c_textid " + 
    "AND " + 
    "  biog_addr_data.c_addr_id = addr_belongs_data.c_addr_id " + 
    "AND " + 
    "  addr_belongs_data.c_belongs_to = addresses.c_addr_id " + 
    "AND " + 
    "  addr_belongs_data.c_belongs_to = a2.c_addr_id ";
  },
  sql_select_PersonEntryInfo: () => {
    return "SELECT " +
    "  entry_types.c_entry_type_desc_chn AS RuShiDoor, " +
    "  entry_codes.c_entry_desc_chn AS RuShiType, " +
    "  entry_data.c_year AS RuShiYear, " +
    "  entry_data.c_age AS RuShiAge, " +
    "  text_codes.c_title_chn AS Source, " +
    "  entry_data.c_pages AS Pages, " +
    "  entry_data.c_notes AS Notes  " +
    "FROM " +
    "  entry_data " +
    "  INNER JOIN text_codes " +
    "  INNER JOIN entry_codes " +
    "  INNER JOIN entry_code_type_rel " +
    "  INNER JOIN entry_types  " +
    "WHERE " +
    "  entry_data.c_personid = ?  " +
    "  AND text_codes.c_textid = entry_data.c_source  " +
    "  AND entry_codes.c_entry_code = entry_data.c_entry_code  " +
    "  AND entry_code_type_rel.c_entry_code = entry_data.c_entry_code  " +
    "  AND entry_code_type_rel.c_entry_type = entry_types.c_entry_type ";
  },
  sql_select_PersonPostings: () => {
    return "SELECT " +
    "	posted_to_addr_data.c_office_id AS OfficeId, " +
    "  office_codes.c_office_chn AS OfficeName, " +
    "  posted_to_addr_data.c_addr_id AS AddrId, " +
    "  addr_codes.c_name_chn AS AddrName, " +
    "	  " +
    "  posted_to_office_data.c_firstyear AS FirstYear, " +
    "  n1.c_nianhao_chn AS FirstYearNianhao, " +
    "  posted_to_office_data.c_fy_nh_year AS FirstYearNiaohaoYear, " +
    "  y1.c_range_chn AS FirstYearRange, " +
    "	 " +
    "  posted_to_office_data.c_lastyear AS LastYear, " +
    "  n2.c_nianhao_chn AS LastYearNianhao, " +
    "  posted_to_office_data.c_ly_nh_year AS LastYearNianhaoYear, " +
    "  y2.c_range_chn AS LastYearRange, " +
    "	 " +
    "  appointment_type_codes.c_appt_type_desc_chn AS ChuShouType, " +
    "  text_codes.c_title_chn AS Source, " +
    "  posted_to_office_data.c_pages AS Pages, " +
    "  posted_to_office_data.c_notes AS Notes " +
    "FROM " +
    "	posting_data " +
    "	INNER JOIN posted_to_addr_data " +
    "	INNER JOIN posted_to_office_data  " +
    "	INNER JOIN office_codes " +
    "	INNER JOIN addr_codes " +
    "	INNER JOIN nian_hao AS n1 " +
    "	INNER JOIN nian_hao AS n2 " +
    "	INNER JOIN text_codes " +
    "	INNER JOIN appointment_type_codes " +
    "	INNER JOIN year_range_codes AS y1 " +
    "	INNER JOIN year_range_codes AS y2 " +
    "WHERE " +
    "	posting_data.c_personid = ? " +
    "	AND posting_data.c_posting_id = posted_to_addr_data.c_posting_id  " +
    "	AND posting_data.c_posting_id = posted_to_office_data.c_posting_id " +
    "	AND posted_to_office_data.c_office_id = office_codes.c_office_id " +
    "	AND posted_to_addr_data.c_addr_id = addr_codes.c_addr_id " +
    "	AND posted_to_office_data.c_fy_nh_code = n1.c_nianhao_id " +
    "	AND posted_to_office_data.c_ly_nh_code = n2.c_nianhao_id " +
    "	AND posted_to_office_data.c_source = text_codes.c_textid " +
    "	AND appointment_type_codes.c_appt_type_code = posted_to_office_data.c_appt_type_code " +
    "	AND posted_to_office_data.c_fy_range = y1.c_range_code " +
    "	AND posted_to_office_data.c_ly_range = y2.c_range_code ";
  },
  sql_select_PersonSocialStatus: () => {
    return "SELECT " +
    "  status_codes.c_status_desc_chn AS StatusName, " +
    "  status_data.c_firstyear AS FirstYear, " +
    "  status_data.c_lastyear AS LastYear  " +
    "FROM " +
    "  status_data " +
    "  INNER JOIN status_codes  " +
    "WHERE " +
    "  status_data.c_personid = ?  " +
    "  AND status_codes.c_status_code = status_data.c_status_code ";
  },
  sql_select_PersonKinshipInfo: () => {
    return "SELECT " +
    "  kin_data.c_kin_id AS KinPersonId, " +
    "  biog_main.c_name_chn AS KinPersonName, " +
    "  kin_data.c_kin_code AS KinCode, " +
    "  kinship_codes.c_kinrel AS KinRel, " +
    "  kinship_codes.c_kinrel_chn AS KinRelName, " +
    "  text_codes.c_title_chn AS Source, " +
    "  kin_data.c_pages AS Pages, " +
    "  kin_data.c_notes AS Notes  " +
    "FROM " +
    "  kin_data " +
    "  INNER JOIN biog_main " +
    "  INNER JOIN kinship_codes " +
    "  INNER JOIN text_codes  " +
    "WHERE " +
    "  kin_data.c_personid = ?  " +
    "  AND biog_main.c_personid = kin_data.c_kin_id  " +
    "  AND kinship_codes.c_kincode = kin_data.c_kin_code  " +
    "  AND text_codes.c_textid = kin_data.c_source ";
  },
  sql_select_PersonSocialAssociation: () => {
    return "SELECT " +
    "  assoc_data.c_assoc_id AS AssocPersonId, " +
    "  biog_main.c_name_chn AS AssocPersonName, " +
    "  assoc_data.c_assoc_code AS AssocCode, " +
    "  assoc_codes.c_assoc_desc_chn AS AssocName, " +
    "  assoc_data.c_assoc_year AS `Year`, " +
    "  assoc_data.c_text_title AS TextTitle, " +
    "  text_codes.c_title_chn AS Source, " +
    "  assoc_data.c_pages AS Pages, " +
    "  assoc_data.c_notes AS Notes  " +
    "FROM " +
    "  assoc_data " +
    "  INNER JOIN biog_main " +
    "  INNER JOIN text_codes " +
    "  INNER JOIN assoc_codes  " +
    "WHERE " +
    "  assoc_data.c_personid = ?  " +
    "  AND assoc_data.c_assoc_id = biog_main.c_personid  " +
    "  AND text_codes.c_textid = assoc_data.c_source  " +
    "  AND assoc_codes.c_assoc_code = assoc_data.c_assoc_code ";
  },
  sql_select_PersonWorks: () => {
    return "SELECT " +
    "  text_data.c_textid AS TextId, " +
    "  text_codes.c_title_chn AS TextName, " +
    "  text_codes.c_text_year AS `Year`, " +
    "  text_role_codes.c_role_desc_chn AS Role, " +
    "  source_text.c_title_chn AS Source, " +
    "  text_data.c_pages AS Pages, " +
    "  text_data.c_notes AS Notes " +
    "FROM " +
    "  text_data " +
    "  INNER JOIN text_codes " +
    "  INNER JOIN text_role_codes " +
    "  INNER JOIN text_codes AS source_text " +
    "WHERE " +
    "  text_data.c_personid = ? " +
    "  AND text_codes.c_textid = text_data.c_textid  " +
    "  AND text_data.c_role_id = text_role_codes.c_role_id " +
    "  AND source_text.c_textid = text_codes.c_source ";
  },
  sql_select_PersonEvents: () => {
    return "SELECT " +
    "	`events`.PERSON_ID, " +
    "	`events`.`EVENT`, " +
    "	`events`.`YEAR`, " +
    "	`events`.ANCIENT_PLACE, " +
    "	`events`.MODERN_PLACE, " +
    "	`events`.LON, " +
    "	`events`.LAT  " +
    "FROM " +
    "	`events`  " +
    "WHERE " +
    "	PERSON_ID = ?";
  }
}

module.exports = query;