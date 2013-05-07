class AddAuthorIdInBooks < ActiveRecord::Migration
  def up
  	add_column :books, :author_id, :integer
  end

  def down
  	remove_column :books, :author_id
  end
end
