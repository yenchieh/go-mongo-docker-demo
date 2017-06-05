package main

import (
	"net/http"
	"os"

	"time"

	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Card struct {
	ID        bson.ObjectId `json:"id" bson:"_id"`
	Name      string        `json:"name"`
	Favorite  string        `json:"favorite"`
	DateAdded time.Time     `json:"dateAdded" bson:"date_added"`
}

func main() {
	e := echo.New()

	e.File("/", "dist/index.html")
	e.Static("/*.js", "dist")
	e.Static("/assets", "assets")

	e.POST("/api/save", save)
	e.GET("/api/get", getCards)

	e.Logger.Fatal(e.Start(":1232"))
}

func getCards(c echo.Context) error {
	var cards []Card
	session, collection := NewDB()
	defer session.Close()

	if err := collection.Find(&bson.M{}).Sort("-date_added").All(&cards); err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, cards)
}

func save(c echo.Context) error {
	var cardRequest Card
	if err := c.Bind(&cardRequest); err != nil {
		log.Fatal(err)
	}

	session, collection := NewDB()
	defer session.Close()

	cardRequest.ID = bson.NewObjectId()
	cardRequest.DateAdded = time.Now()
	if err := collection.Insert(&cardRequest); err != nil {
		panic(err)
	}

	var result []Card

	if err := collection.Find(&bson.M{}).Sort("-date_added").All(&result); err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, result)
}

func NewDB() (*mgo.Session, *mgo.Collection) {
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		panic(err)
	}
	session.SetMode(mgo.Monotonic, true)
	collection := session.DB(os.Getenv("DB_NAME")).C("card")

	return session, collection
}
