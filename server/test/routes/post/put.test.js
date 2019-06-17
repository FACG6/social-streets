const test = require("tape");
const supertest = require("supertest");
const app = require("../../../app");

const {
  buildDb,
  buildFakeData,
  buildStaticData
} = require("../../../database/config/build");

test("update existing post at /api/v1/post/1", async t => {
  // build the testing database
  await buildDb();
  await buildStaticData();
  await buildFakeData();

  // start testing
  try {
    supertest(app)
      .put("/api/v1/post/1")
      .set("Cookie", [
        "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM"
      ])
      .field("type", "event")
      .field("title", "New Title 17/6/2019 - 9:45:33 AM.")
      .field("description", "Lorem Lorem Lorem")
      .field("category", 1)
      .field("eventDatetime", "19/6/2019 - 04:00 p.m")
      .field("venue", "gaza st")
      .field("website", "www.qqqq.com")
      .field("altText", "new alt text")
      .field("cost", 15)
      .field("isDraft", false)
      .field("focusKey", "focusKeyword")
      .field("meta", "this is meta description")
      .field("publishDatetime", "17/6/2019 - 09:30 p.m")
      .field("eventTopic", [1, 2])
      .attach("image", "test/fakeImg/amideasblue.png")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) t.error(err);
        t.deepEqual(
          res.body,
          { data: "Updated event successfully", statusCode: 200 },
          "Excpect the server to responed with success"
        );
        // t.end();
      });
  } catch (err) {
    t.error(err);
  }

  try {
    supertest(app)
      .put("/api/v1/post/1")
      .set("Cookie", [
        "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM"
      ])
      .field("type", "public_services")
      .field("primaryTag", 1)
      .field("description", "description for the public_services")
      .field("focusKey", "focusKeyword")
      .field("altText", "desc fro img")
      .field("meta", "this is metaDescription")
      .field("publishDatetime", "11/4/2019")
      .field("title", "Title new public_services title")
      .field("isDraft", false)
      .field("secondaryTag", [1, 2, 3])
      .attach("image", "test/fakeImg/amideasblue.png")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) t.error(err);
        t.deepEqual(
          res.body,
          { data: "Updated public service successfully", statusCode: 200 },
          "Excpect the server to responed with success"
        );
        t.end();
      });
  } catch (err) {
    t.error(err);
  }
});

test.onFinish(() => process.exit(0));
