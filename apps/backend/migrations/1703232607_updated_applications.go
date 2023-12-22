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
		edit_tags := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "zsvdpxos",
			"name": "tags",
			"type": "json",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSize": 5000
			}
		}`), edit_tags)
		collection.Schema.AddField(edit_tags)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("kt46al122joiha5")
		if err != nil {
			return err
		}

		// update
		edit_tags := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "zsvdpxos",
			"name": "tags",
			"type": "json",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSize": 5000
			}
		}`), edit_tags)
		collection.Schema.AddField(edit_tags)

		return dao.SaveCollection(collection)
	})
}
