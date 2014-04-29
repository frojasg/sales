collection @items
attributes :uuid, :title, :status, :description, :price
child(:images) { attributes :uuid, :capture, :url }
