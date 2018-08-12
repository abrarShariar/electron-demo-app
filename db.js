//connection
const { Pool } = require('pg');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');

const config = {
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: '5432',
  database: 'marketplace_test',
  max: 10,
  idleTimeoutMillis: 5000
}

const pool = new Pool(config);

//db functions
const getAllUsers = async () => {
  const queryStr = 'SELECT * FROM users';
  try {
    const res = await pool.query(queryStr);
    return res.rows;
  } catch (err) {
    console.log("Error in getAllUsers(): ", err);
  }
}


const createNewUser = async (data) => {
  const current_date = (new Date()).valueOf().toString();
  const random = Math.random().toString();
  let hash = '123';
  const password_hash = '123';

  const queryStr = `
    INSERT INTO users
    (name, username, organization, email, phone, password_hash, active, type, public_key, private_key)
    VALUES ('${data.name}',
            '${data.username}',
            '${data.organization}',
            '${data.email}',
            '${data.phone}',
            '${password_hash}',
             0, 'mt',
            '${data.public_key}',
            '${data.private_key}'
            )
            RETURNING *`;

            try {
            const res = await pool.query(queryStr);
            return res.rowCount > 0 ? true : false;
          } catch (err) {
            console.log("Error in createNewUser", err);
            return false;
          }
}

const deleteUser = async (data) => {
  const queryStr = `
    DELETE FROM users
    WHERE id = ${data.id}
  `;

  try {
  const res = await pool.query(queryStr);
  return res.rowCount > 0 ? true : false;
} catch (err) {
  console.log("Error in createNewUser", err);
  return false;
}

}

module.exports = {
  getAllUsers,
  createNewUser,
  deleteUser
}
