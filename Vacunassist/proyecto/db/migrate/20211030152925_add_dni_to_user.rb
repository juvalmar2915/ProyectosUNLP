class AddDniToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :DNI, :string
  end
end
