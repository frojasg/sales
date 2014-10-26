require 'web_spec_helper'
require_relative '../../services/facebook'

require 'json'
require 'typhoeus'
require 'active_support/core_ext/hash'

describe Facebook do

  context 'when we get a valid access token' do
    let(:access_token) {'CAALuFtY5lz4BABBY3bjNK8v4uZCxRrcGuzFESshbb8pvBJY37IeRZBMRykKW6jX7Bc3t9DFDVC1qSoWzKc2xOh8zrU1I3cwMAZCvsrN9zrH7yUiwjftFcil3ZAw2JfcRHBcFRZB6dzRKDbQUiPCfAc6k8StJWZAQgUbonPcXsvg39XxRLZAiDg1NwjxqtfwsoAGgvnWGW4GhwZDZD'}

    it 'fetch user profile information from facebook' do
      VCR.use_cassette 'profile' do
        user = Facebook.me(access_token)
        expect(user).to eq(first_name: 'Francisco', last_name: 'Rojas', id: '712817506')
      end
    end
  end

  context 'when we get an invalid access_token' do
    let(:access_token) {'invalid'}

    it 'raise an error' do
      VCR.use_cassette 'invalid_acces_token' do
        expect{Facebook.me(access_token)}.to raise_error(ArgumentError, "Invalid OAuth access token.")
      end
    end
  end
end
