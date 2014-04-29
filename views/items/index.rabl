collection @items
attributes :uuid, :title, :status, :price
child(:images) { attributes :uuid, :capture, :url }
