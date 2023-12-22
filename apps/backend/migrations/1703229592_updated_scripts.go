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

		// add
		new_userscript_file := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "4jax0wbq",
			"name": "userscript_file",
			"type": "file",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"mimeTypes": [
					"application/javascript"
				],
				"thumbs": [],
				"maxSelect": 1,
				"maxSize": 5242880,
				"protected": false
			}
		}`), new_userscript_file)
		collection.Schema.AddField(new_userscript_file)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("o82tdxp0qnyrnso")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("4jax0wbq")

		return dao.SaveCollection(collection)
	})
}
