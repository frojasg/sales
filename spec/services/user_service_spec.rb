require 'full_spec_helper'
require_relative '../../services/user_service'
require_relative '../../params/user_parameters'

Facebook = Class.new
#User = Class.new

describe UserService do
  context 'when the user does not exist in our database' do
    let(:access_token) {'some_access_token'}

    it 'return an User for a given access token' do
      allow(Facebook).to receive(:me).with(access_token).and_return(
        username: 'frojasg', first_name: 'Francisco', last_name: 'Rojas', id: '1234')

      user = UserService.user(access_token)
      expect(user.username).to eq('frojasg')
      expect(user.first_name).to eq('Francisco')
      expect(user.last_name).to eq('Rojas')
      expect(user.uuid).not_to be_nil
      expect(user.exist?).to be true
    end

    it 'return non a user when the user does not exist' do
      allow(Facebook).to receive(:me).with(access_token).and_raise(ArgumentError, "Invalid OAuth access token")

      user = UserService.user(access_token)

      expect(user.exist?).to be false
    end
  end

  context 'when the user exist in our database' do
    let(:access_token) {'some_access_token'}

    let(:expected_user) {
      User.create(username: 'frojasg', first_name: 'Francisco', last_name: 'Rojas', reference: '1234')
    }

    it 'return an User for a given access token' do
      allow(Facebook).to receive(:me).with(access_token).and_return(
        username: expected_user.username, first_name: 'Francisco', last_name: 'Rojas', id: '1234')

      user = UserService.user(access_token)
      expect(user.uuid).to eq(expected_user.uuid)
      expect(user.exist?).to be true
    end
  end
end
