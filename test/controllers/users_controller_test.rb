require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def test_create
    post "/api/users", params: { first_name: "First", last_name: "Last", email: ENV['TEST_EMAIL'], password: "password", password_confirmation: "password" }
  end
end
