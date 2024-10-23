import { ponder } from "@/generated";
import { Axios } from "axios";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

ponder.on("ITSE:Transfer", async ({ event, context }) => {
  const { Account, Token, TransferEvent } = context.db;
  console.log("caught a transfer")
  // Create an Account for the sender, or update the balance if it already exists.
  await Account.upsert({
    id: event.args.from,
  });

  // Create an Account for the recipient, or update the balance if it already exists.
  await Account.upsert({
    id: event.args.to,
  });

  // Create or update a Token.
  await Token.upsert({
    id: event.args.id,
    create: {
      ownerId: event.args.to,
    },
    update: {
      ownerId: event.args.to,
    },
  });

  // Create a TransferEvent.
  await TransferEvent.create({
    id: event.log.id,
    data: {
      fromId: event.args.from,
      toId: event.args.to,
      tokenId: event.args.id,
      timestamp: Number(event.block.timestamp),
    },
  });

  console.log("now calling api")

  const key = "superadmin@abc.com"
  const bucketName = 'abc';
  const uploadParams = { Bucket: bucketName, Key: String(key) }

  s3.getObject(uploadParams, function (err, data) {
    if (err) {
      return err
    }
      console.log(data.Body,"found something")
  });
});
