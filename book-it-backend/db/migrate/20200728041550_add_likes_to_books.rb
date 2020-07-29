class AddLikesToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :likes, :integer
  end
end
