package main

import (
	"os"

	_ "backend/migrations"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	appIp := os.Getenv("APP_IP")
	if appIp == "" {
		appIp = "localhost"
	}

	appPort := os.Getenv("APP_PORT")
	if appPort == "" {
		appPort = "8090"
	}

	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: true,
	})

	app.Bootstrap()

	_, err := apis.Serve(app, apis.ServeConfig{
		HttpAddr:        appIp + ":" + appPort,
		ShowStartBanner: true,
		AllowedOrigins:  []string{"https://greasify.vercel.app"},
	})

	if err != nil {
		panic(err)
	}
}
