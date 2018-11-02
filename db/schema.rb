# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_02_015218) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "faves", force: :cascade do |t|
    t.string "name"
    t.string "place"
    t.decimal "lat"
    t.decimal "lon"
    t.bigint "users_id"
    t.index ["users_id"], name: "index_faves_on_users_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "code"
    t.integer "size"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "lat"
    t.decimal "lon"
  end

  create_table "members", force: :cascade do |t|
    t.string "name"
    t.decimal "lat", precision: 10, scale: 6
    t.decimal "lon", precision: 10, scale: 6
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "group_id"
    t.text "place"
    t.integer "icon"
    t.index ["group_id"], name: "index_members_on_group_id"
    t.index ["user_id"], name: "index_members_on_user_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.string "username"
    t.string "fullname"
    t.integer "age"
    t.bigint "user_id"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "faves", "users", column: "users_id"
  add_foreign_key "members", "groups"
  add_foreign_key "members", "users"
  add_foreign_key "profiles", "users"
end
