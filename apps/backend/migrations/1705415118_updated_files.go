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

		collection, err := dao.FindCollectionByNameOrId("59fkir4bwhj0zee")
		if err != nil {
			return err
		}

		// update
		edit_script := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "yhx56ndd",
			"name": "script",
			"type": "file",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"mimeTypes": [
					"text/plain"
				],
				"thumbs": [],
				"maxSelect": 1,
				"maxSize": 5242880,
				"protected": false
			}
		}`), edit_script)
		collection.Schema.AddField(edit_script)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("59fkir4bwhj0zee")
		if err != nil {
			return err
		}

		// update
		edit_script := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "yhx56ndd",
			"name": "script",
			"type": "file",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"mimeTypes": [
					"application/javascript",
					"text/plain"
				],
				"thumbs": [],
				"maxSelect": 1,
				"maxSize": 5242880,
				"protected": false
			}
		}`), edit_script)
		collection.Schema.AddField(edit_script)

		return dao.SaveCollection(collection)
	})
}
