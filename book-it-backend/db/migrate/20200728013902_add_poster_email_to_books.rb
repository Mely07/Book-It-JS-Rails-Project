class AddPosterEmailToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :poster_email, :string
  end
end
