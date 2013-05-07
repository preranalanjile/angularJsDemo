class Book < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :name, :description
  belongs_to :author
  
  validates :name, :description, :presence => true
end
