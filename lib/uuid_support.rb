require 'uuidtools'

module UUIDSupport
  def self.included(mod)
    mod.after_initialize :generate_uuid
  end

  protected
  def generate_uuid
    self.uuid = UUIDTools::UUID.random_create.to_s unless self.uuid.present?
  end
end
