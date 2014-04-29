class UserParameters
  def initialize(params)
    @params = params
  end
  def permit
    {
      username: @params['username'],
      first_name: @params['first_name'],
      last_name: @params['last_name'],
      reference: @params['id']
    }
  end
end
