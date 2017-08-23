# == Schema Information
#
# Table name: responses
#
#  id               :integer          not null, primary key
#  user_id          :integer          not null
#  answer_choice_id :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Response < ApplicationRecord
  validates :user_id, :answer_choice_id, presence: true, uniqueness: true
  validate :unique_respondent
  validate :respondent_not_author

  def unique_respondent
    errors[:User] << "has already responded!" if respondent_already_answered?
  end

  def respondent_not_author
    if self.question.poll.author.id == self.respondent.id
      errors[:User] << "ds cannot respond to your own poll!!"
  end


  belongs_to :answer_choices,
    primary_key: :id,
    foreign_key: :answer_choice_id,
    class_name: :AnswerChoice

  belongs_to :respondent,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

  has_one :question, through: :answer_choices, source: :question

  def sibling_responses
    question.responses.where.not(id: self.id)
  end

  def respondent_already_answered?
    sibling_responses.exists?(user_id: respondent.id)
  end
end
