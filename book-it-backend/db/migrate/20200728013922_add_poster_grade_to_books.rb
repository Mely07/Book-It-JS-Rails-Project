class AddPosterGradeToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :poster_grade, :string
  end
end
