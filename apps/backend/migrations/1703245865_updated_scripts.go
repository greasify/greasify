package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("o82tdxp0qnyrnso")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("f8byc4il")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("o82tdxp0qnyrnso")
		if err != nil {
			return err
		}

		// add
		del_application := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "f8byc4il",
			"name": "application",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "kt46al122joiha5",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), del_application)
		collection.Schema.AddField(del_application)

		return dao.SaveCollection(collection)
	})
}
