const quires = {
  create_table:
    "CREATE TABLE users (user_id NUMBER(11) PRIMARY KEY , username VARCHAR(255), password VARCHAR(255))",

  insert_values: "INSERT INTO users VALUES(001,'john','JHON@2133')",

  select_values: "SELECT * FROM users",

  delete_values: "DELETE FROM users WHERE 'user_id' = 001",

  update_values: "UPDATE FROM users",
};

module.exports = quires;
