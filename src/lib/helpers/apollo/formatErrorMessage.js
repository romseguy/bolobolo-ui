export default function formatErrorMessage(message) {
  return message.replace(/in field "[a-z]+": (.+)/i, (match, p1) => p1)
}
