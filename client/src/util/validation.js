function areEmojis(str) {
    const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base}\p{Emoji_Modifier})+$/u;
    return emojiRegex.test(str);
}
function isEmoji(str) {
    return emojiRegex.test(str) && !areEmojis(str);
}

function isAlphanumericUnicode(str) {
    return /^[\p{L}\p{N}\s]+$/u.test(str);
}

export { isEmoji, areEmojis, isAlphanumericUnicode };