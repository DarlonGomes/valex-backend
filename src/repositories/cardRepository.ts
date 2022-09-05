import { connection } from "../../src/database/database";
import { mapObjectToUpdateQuery } from "../../src/utils/sqlUtils";
import { BusinessesType, Card, CardInsertData, CardUpdateData  } from "../interfaces/cardInterface.js";


export async function find() {
  const result = await connection.query<Card>("SELECT * FROM cards");
  return result.rows;
}

export async function findById(id: number) {
  const result = await connection.query<Card, [number]>(
    "SELECT * FROM cards WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

export async function findByTypeAndEmployeeId(
  type: BusinessesType,
  employeeId: number
) {
  const result = await connection.query<Card, [BusinessesType, number]>(
    `SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`,
    [type, employeeId]
  );

  return result.rows[0];
}

export async function findByCardDetails(
  number: string,
  cardholderName: string,
  expirationDate: string
) {
  const result = await connection.query<Card, [string, string, string]>(
    ` SELECT 
        * 
      FROM cards 
      WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`,
    [number, cardholderName, expirationDate]
  );

  return result.rows[0];
}

export async function insert(cardData: CardInsertData) {
  const {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type,
  } = cardData;

 const {rows: [cardId]} = await connection.query(
    `
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id AS "cardId"
  `,
    [
      employeeId,
      number,
      cardholderName,
      securityCode,
      expirationDate,
      password,
      isVirtual,
      originalCardId,
      isBlocked,
      type,
    ]
  );
  return cardId
}

export async function update(id: number, cardData: CardUpdateData) {
  const { objectColumns: cardColumns, objectValues: cardValues } =
    mapObjectToUpdateQuery({
      object: cardData,
      offset: 2,
    });

  await connection.query(
    `
    UPDATE cards
      SET ${cardColumns}
    WHERE $1=id
  `,
    [id, ...cardValues]
  );
}

export async function remove(id: number) {
  await connection.query<any, [number]>("DELETE FROM cards WHERE id=$1", [id]);
}

export async function receipt (id: number){
  const {rows: [receipt]} = await connection.query(
    `
    SELECT
    COALESCE((SELECT SUM(amount) FROM recharges WHERE "cardId" = $1)
    - (SELECT SUM(amount) FROM payments WHERE "cardId" = $1), 0) AS balance,
      array(
        SELECT
        json_build_object(
          'id', payments.id,
          'cardId', payments."cardId",
          'businessName', businesses.name,
          'timestamp', payments.timestamp,
          'amount', payments.amount
        )
        FROM payments
        JOIN businesses ON payments."businessId" = businesses.id
        WHERE payments."cardId" = $1
        ORDER BY payments.id DESC
      ) AS transactions,
      array(
        SELECT
        json_build_object(
          'id', recharges.id,
          'cardId', recharges."cardId",
          'timestamp', recharges.timestamp,
          'amount', recharges.amount
        )
        FROM recharges
        WHERE recharges."cardId" = $1
        ORDER BY recharges.id DESC
      ) AS recharges
    
    `, [id]
  );
  return receipt
}
