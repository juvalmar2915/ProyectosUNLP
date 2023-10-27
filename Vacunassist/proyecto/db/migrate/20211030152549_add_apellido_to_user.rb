class AddApellidoToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :apellido, :string
  end
end
