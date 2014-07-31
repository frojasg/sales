object @order
attributes :uuid, :purchase_at, :prority
child(:item) { attributes :uuid, :title, :status, :price }
child(:user) { attributes :uuid, :username, :first_name, :last_name }
