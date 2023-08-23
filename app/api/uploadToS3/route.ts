import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

export async function POST(request: Request) {
	AWS.config.update({
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
	});

	const formData: FormData = await request.formData();
	const file: File = formData.get("file") as File;
	const fileName: string = file.name;

	const buffer = await blobToBuffer(file);

	const photoKey = `${uuidv4()}-${fileName}`;

	const bucket = process.env.AWS_BUCKET_NAME;
	if (!bucket) {
		throw new Error("Missing env var: BUCKET_NAME");
	}

	var upload = new AWS.S3.ManagedUpload({
		params: {
			Bucket: bucket,
			Key: photoKey,
			Body: buffer,
		},
	});

	try {
		let data = await upload.promise();
		console.log("Successfully uploaded photo.");

		let Url = "https://ekknr.s3.amazonaws.com/" + photoKey;
		return NextResponse.json({ Url: Url });
	} catch (err: any) {
		console.log("There was an error uploading your photo: ", err.message);
		return NextResponse.json(err, { status: 500 });
	}
}

async function blobToBuffer(blob: Blob): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const chunks: any[] = [];
		const reader = blob.stream().getReader();

		function pump() {
			reader
				.read()
				.then(({ done, value }) => {
					if (done) {
						resolve(Buffer.concat(chunks));
						return;
					}
					chunks.push(value);
					pump();
				})
				.catch(reject);
		}

		pump();
	});
}
