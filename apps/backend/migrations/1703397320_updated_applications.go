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

		collection, err := dao.FindCollectionByNameOrId("u8cie3jpotr0iv3")
		if err != nil {
			return err
		}

		collection.ListRule = types.Pointer("@request.auth.id = user.id")

		collection.ViewRule = types.Pointer("@request.auth.id = user.id")

		collection.CreateRule = types.Pointer("@request.auth.id = user.id")

		collection.UpdateRule = types.Pointer("@request.auth.id = user.id")

		collection.DeleteRule = types.Pointer("@request.auth.id = user.id")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("u8cie3jpotr0iv3")
		if err != nil {
			return err
		}

		collection.ListRule = types.Pointer("@request.auth.id != null")

		collection.ViewRule = types.Pointer("@request.auth.id != null")

		collection.CreateRule = types.Pointer("@request.auth.id != null")

		collection.UpdateRule = types.Pointer("user = @request.auth.id")

		collection.DeleteRule = types.Pointer("user = @request.auth.id")

		return dao.SaveCollection(collection)
	})
}
