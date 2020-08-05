class Book < ApplicationRecord
    has_many :comments

    validates_presence_of :title, :author, :subject, :rating, :poster_username, :poster_grade, :likes
end
