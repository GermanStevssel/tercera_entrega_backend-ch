import dotenv from "dotenv";
dotenv.config();

export const config = {
	mongodb: {
		url: process.env.mongoURI,
	},
	firebase: {
		type: "service_account",
		project_id: "basefirebase-a7ba6",
		private_key_id: "9106c018a8b95756962914141dd700bd2ef613ac",
		private_key:
			"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpdIcOuBnY7vxw\n5e5s3pxn3DP7Rt6yktw6Q0qE839/HzqYGOPVfuMIk8gS8GE+5mIU2yqsE1JePEie\n5+myyJhPr12BVhveRVQ8yT4qZ8yR2h1xGshmfelu40PZKGtwN6jthxitS4pgC28Y\nzH9R3PF0JsegxteuINXEMeYm+IErCUrfHKIUcrcynTy00I6NIneStFUWHapyClas\nsnqgMWeQIJJBlUyheY2Cwq77nwbCijwTs1YPRi50b4UWnHJ3szenkLsSpL40SqHU\ncZabZa4EGCIwpxlAf2+CRHTrsY0dpYd7PWbNiecjlSq7AafK3fa0hpZOBWOoOfyi\nU++hKcklAgMBAAECggEAA4/M9Oy+slYXnUHf+I7XR8GToCD1tlgq49idPN0nXWMp\nJqBDTa38lKYSiv9dc+aAwkJ3C6XeUde/iQOD4Huh4+7iLsFCFbJsWli6g0aqQJiO\njN2Mv8a+vNNvDiXw2Ct7U/7GcIIJdwpWe/V0aaKUuqXEBWeYifLru1N3LHOFt4NS\nN6MXG+AAv/e/x91BAYW+SRt8Fzxn04PhAbi0bpBIata8Sm57eScjvCs1zqigNenl\nhkyPwwps8UpsnI1PFWu3AOR1/2yN3P5HrbGJ1XLoY7I0jb7ivNkzDlOvpXtjoRkZ\n7AXmSPh2tch70+SaKcFqSAsqsKgxEQq4rqL9x87cQwKBgQDdCtPPxzrjM99EkFk9\nTKePcdnphi8yGL/MU08sPDYOpJATnBguujwLUzt8iB5QOTxuXiy0MmoSLgONdaSI\nLL2l61Qcxl35nfL+205Nj8EZqNlr15A9kznINOQz5tTbJnik2wGggvEUn/yYx8kZ\nsJKhDiyuuwF4hG/kDYsL5W7TJwKBgQDEQSG/oXo+fTWDgRpTndICo4tOh5G48bzs\nXPj5mIkmWRdM5vKuR2S+ECFztO6p/ArpRUKaIZZURE8t/hdMMJtbK5Bch9RrpvLg\nldtb0W3JHeYcenWkQHjfDO+jNM2fAwbIlaxugRiOcwUVFfycKQ3oAnJMtMSY3Edn\n9oGiQrhA0wKBgFkuCiD1R4vtHLIj7u0tZRkZnQp7icUTeSZtoi69qC2mNT7EJnmL\nx7fl/8URgfFp9jitJCobgPIOwH4tLZGHQ4iSdmAZpEaWdDhgsKnYStcYaYf584b0\nREbDGCLciZpVXi1c8r4Ytj1VAut9B2Sm+bGi72Ibrs85147R6/yDt3/XAoGADI/q\nvBx2+bcEDOXfrIiGn9qeGSm+XytCH5MX8ModxVGglzCVSiiRv0TDD2f+eu0COcpQ\nKBOMTtqMgvInxZ265AwW0oVzSGzIUS3me6sdLul2CE6iZyAlXIm0cSr5GnuUHJTQ\nE8a5rqyYH7Bnmgtas4YskNJlXy+Cdpol1CAXMTcCgYEAgaInvc2FIBZjFDS1gUE0\nVrtmkHBKO/98TdrfU4BaNWX4YXBnma1SF47ifsn49ILA9igVAZqyojA8B5OytAgM\niOx9VvL5K3AKYHIidkFvMZwUA6aAn0bgveBOTLQ6PEy4d54fwbfUWFf4DbLEdG1V\noS2pEW3uGWfyqnYnsLIHTr4=\n-----END PRIVATE KEY-----\n",
		client_email:
			"firebase-adminsdk-65n9g@basefirebase-a7ba6.iam.gserviceaccount.com",
		client_id: "102391391619883230863",
		auth_uri: "https://accounts.google.com/o/oauth2/auth",
		token_uri: "https://oauth2.googleapis.com/token",
		auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
		client_x509_cert_url:
			"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-65n9g%40basefirebase-a7ba6.iam.gserviceaccount.com",
	},
};