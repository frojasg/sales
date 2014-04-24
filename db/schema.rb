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

ActiveRecord::Schema.define(version: 20140302002055) do

  create_table "images", force: true do |t|
    t.string   "uuid",       limit: 36
    t.string   "capture"
    t.string   "url"
    t.integer  "item_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "images", ["item_id"], name: "index_images_on_item_id"
  add_index "images", ["uuid"], name: "index_images_on_uuid"

  create_table "items", force: true do |t|
    t.string   "uuid",        limit: 36
    t.string   "title"
    t.string   "status",                 default: "available"
    t.text     "description"
    t.integer  "price"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "items", ["status"], name: "index_items_on_status"
  add_index "items", ["uuid"], name: "index_items_on_uuid"

  create_table "users", force: true do |t|
    t.string   "uuid",       limit: 36
    t.string   "username"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "reference"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["uuid"], name: "index_users_on_uuid"

end
