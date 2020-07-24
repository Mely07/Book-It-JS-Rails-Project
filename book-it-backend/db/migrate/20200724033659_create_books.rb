class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :publisher
      t.string :subject
      t.text :review
      t.integer :rating
      t.belongs_to :user

      t.timestamps
    end
  end
end
