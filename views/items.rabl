collection @items
attributes :id, :title
child(:images) { attributes :id, :capture, :url }
