namespace :db_seeds do

  SEED_FILE_PATH = Rails.root.join('lib', 'assets',
                                      'db_seed.json')

  desc "Dump seed items and qr_codes to file"
  task dump: :environment do
    File.open(SEED_FILE_PATH, 'w') { |file|
      Item.all.each { |item|
        item_object = get_activerecord_attributes(item)
        file.puts(item_object.to_json + "\n")
      }
    }
  end

  desc "TODO"
  task load: :environment do
    QrCode.delete_all
    Item .delete_all

    File.foreach(SEED_FILE_PATH) { |line|
      item_object = JSON.parse(line)
      print item_object
    }
  end

  def get_activerecord_attributes object
    object.attributes.except('id',
                             'created_at',
                             'updated_at')
  end

end
