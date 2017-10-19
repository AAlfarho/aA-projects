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

require 'rails_helper'

RSpec.describe Goal, type: :model do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:details) }
  it { should validate_presence_of(:public) }
  it { should validate_presence_of(:completed) }
  it { should validate_length_of(:title).is_at_least(6) }   

  it { should belong_to(:user)}
end
