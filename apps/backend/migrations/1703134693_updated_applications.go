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

		// remove
		collection.Schema.RemoveField("uylqzx4p")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("kt46al122joiha5")
		if err != nil {
			return err
		}

		// add
		del_banner_url := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "uylqzx4p",
			"name": "banner_url",
			"type": "url",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"exceptDomains": null,
				"onlyDomains": null
			}
		}`), del_banner_url)
		collection.Schema.AddField(del_banner_url)

		return dao.SaveCollection(collection)
	})
}
