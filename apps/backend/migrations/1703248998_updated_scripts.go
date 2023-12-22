package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("o82tdxp0qnyrnso")
		if err != nil {
			return err
		}

		collection.ListRule = types.Pointer("")

		collection.ViewRule = types.Pointer("")

		collection.CreateRule = types.Pointer("")

		collection.UpdateRule = types.Pointer("")

		collection.DeleteRule = nil

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("o82tdxp0qnyrnso")
		if err != nil {
			return err
		}

		collection.ListRule = types.Pointer("@request.auth.id = @collection.users.id")

		collection.ViewRule = types.Pointer("@request.auth.id = @collection.users.id")

		collection.CreateRule = types.Pointer("@request.auth.id = @collection.users.id")

		collection.UpdateRule = types.Pointer("@request.auth.id = @collection.users.id")

		collection.DeleteRule = types.Pointer("@request.auth.id = @collection.users.id")

		return dao.SaveCollection(collection)
	})
}
