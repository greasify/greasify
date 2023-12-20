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

		// add
		new_daily_installs := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "1qcg72cw",
			"name": "daily_installs",
			"type": "number",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"noDecimal": false
			}
		}`), new_daily_installs)
		collection.Schema.AddField(new_daily_installs)

		// add
		new_total_installs := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "g4huxugc",
			"name": "total_installs",
			"type": "number",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"noDecimal": false
			}
		}`), new_total_installs)
		collection.Schema.AddField(new_total_installs)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("kt46al122joiha5")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("1qcg72cw")

		// remove
		collection.Schema.RemoveField("g4huxugc")

		return dao.SaveCollection(collection)
	})
}
