class BooksController < InheritedResources::Base

	belongs_to :author
	respond_to :json

end
