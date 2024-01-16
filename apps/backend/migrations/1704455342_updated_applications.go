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

		collection, err := dao.FindCollectionByNameOrId("u8cie3jpotr0iv3")
		if err != nil {
			return err
		}

		// add
		new_readme := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "reputtgm",
			"name": "readme",
			"type": "editor",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"convertUrls": false
			}
		}`), new_readme)
		collection.Schema.AddField(new_readme)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("u8cie3jpotr0iv3")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("reputtgm")

		return dao.SaveCollection(collection)
	})
}
