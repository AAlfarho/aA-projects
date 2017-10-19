# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  content          :text             not null
#  commentable_type :string
#  commentable_id   :integer
#  author_id        :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Comment < ApplicationRecord
  validates :content, presence: true
  belongs_to :commentable, polymorphic: true

  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

  def find_post_id
    return commentable_id if commentable_type == 'Post'
    self.commentable.find_post_id
  end

end
