class Author < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :name
  has_many :books, :dependent => :destroy

  validates :name, :presence => true, :uniqueness => true

end
