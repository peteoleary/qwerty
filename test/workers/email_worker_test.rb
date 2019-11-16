require 'test_helper'
class EmailWorkerTest < MiniTest::Unit::TestCase
  def test_account
    email_worker = EmailWorker.new
    email_worker.test_send_in_blue_account
  end

  def test_send
    email_worker = EmailWorker.new
    email_worker.test_send_in_blue_send 'pete@timelight.com'
  end
end
