class AddArtworksUnique < ActiveRecord::Migration[5.1]
  def change
    add_index :artworks, [:title, :artist_id], unique: true
  end
end
