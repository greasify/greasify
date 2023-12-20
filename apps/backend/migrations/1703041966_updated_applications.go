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

		collection, err := dao.FindCollectionByNameOrId("kt46al122joiha5")
		if err != nil {
			return err
		}

		// update
		edit_latest_version := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "l4y9vbs9",
			"name": "latest_version",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_latest_version)
		collection.Schema.AddField(edit_latest_version)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("kt46al122joiha5")
		if err != nil {
			return err
		}

		// update
		edit_latest_version := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "l4y9vbs9",
			"name": "version",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_latest_version)
		collection.Schema.AddField(edit_latest_version)

		return dao.SaveCollection(collection)
	})
}
