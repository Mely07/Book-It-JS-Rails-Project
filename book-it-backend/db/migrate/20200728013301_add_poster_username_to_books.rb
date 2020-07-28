class AddPosterUsernameToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :poster_username, :string
  end
end
