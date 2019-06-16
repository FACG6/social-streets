const test = require("tape");
const request = require("supertest");

const app = require("../../../server/app");
const {
  buildDb,
  buildFakeData,
  buildStaticData
} = require("./../../database/config/build.js");

test("get event post", t => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .get("/api/v1/post/1")
        .set("Cookie", [
          "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTYwNjQ3ODAxfQ._8HuPnW0ToN5B1aH-ubzGRHoSoJlEywVCmggd3aoiOU"
        ])
        .send({ postType: "event" })
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else if (res.body.error) {
            t.error(res.body.error);
          } else {
            const eventInfo = res.body.data;
            t.equal(Object.keys(eventInfo).length, 4, "get sucssfully");
            t.deepEqual(
              Object.keys(eventInfo["0"]),
              [
                "id",
                "title",
                "description",
                "category",
                "event_datetime",
                "venue",
                "website",
                "cost",
                "image",
                "focus_key",
                "meta",
                "alt_text",
                "is_draft",
                "publisher_id",
                "publish_datetime",
                "event_id",
                "topic_id",
                "topic"
              ],
              "get event post sucssfully"
            );
            t.equal(res.body.data["0"].id, 1, "id is 2");
            t.end();
          }
        });
    })
    .catch(err => console.log(err));
});

test("get public_service post", t => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      request(app)
        .get("/api/v1/post/1")
        .set("Cookie", [
          "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTYwNjQ4NzgzfQ.PD8QTSkYcWVUMZ_o7mhKgt1J0MWrAoArQqtv2dlTT28"
        ])
        .send({ postType: "public_service" })
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else if (res.body.error) {
            t.error(res.body.error);
          } else {
            const publicServiceInfo = res.body.data;
            t.equal(Object.keys(publicServiceInfo).length, 3, "get sucssfully");
            t.deepEqual(
              Object.keys(publicServiceInfo["0"]),
              [
                "id",
                "primary_tag",
                "description",
                "image",
                "focus_key",
                "alt_text",
                "meta",
                "publisher_id",
                "publish_datetime",
                "title",
                "is_draft",
                "tag",
                "secondary_tag",
                "public_service_id"
              ],
              "update project and it users sucssfully"
            );
            t.equal(res.body.data["0"].id, 1, "id is 1");
            t.end();
          }
        });
    })
    .catch(err => console.log(err));
});

test.onFinish(() => process.exit(0));
