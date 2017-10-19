# == Schema Information
#
# Table name: goals
#
#  id         :integer          not null, primary key
#  title      :string
#  details    :text
#  public     :boolean          default(TRUE)
#  completed  :boolean          default(FALSE)
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Goal < ApplicationRecord
  validates :title, :details, :public, :completed,  presence: true
  validates :title, length: {minimum: 6}, allow_nil:true

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

end
